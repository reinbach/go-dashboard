package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/googollee/go-socket.io"
)

type LineChart struct {
	Index int
	Value float64
	Max   float64
	Min   float64
}

func ChatHandler(so socketio.Socket, msg string) {
	so.BroadcastTo("chat", "chat message", msg)
}

func StreamData(so socketio.Socket, l LineChart) {
	r := rand.New(rand.NewSource(1000000))
	t := time.NewTicker(time.Second / 10)
	go func() {
		i := l.Index
		for _ = range t.C {
			i += 1
			v := r.Float64() * l.Max
			d := LineChart{
				Index: i,
				Value: v,
			}
			j, err := json.Marshal(d)
			if err != nil {
				log.Println("Failed to Marshal message: ", err)
			}
			so.Emit("chart stream", string(j))
		}
	}()
}

func ChartHandler(so socketio.Socket, msg string) {
	d := LineChart{}
	err := json.Unmarshal([]byte(msg), &d)
	if err != nil {
		log.Println("Unknown message: ", err)
	}
	StreamData(so, d)
}

func SocketHandler(so socketio.Socket) {
	log.Println("connected")

	// chat
	so.Join("chat")
	so.On("chat message", ChatHandler)

	// line chart simple
	so.Join("chart")
	so.On("chart stream", ChartHandler)

	so.On("disconnection", func() {
		log.Println("disconnected")
	})
}

func SocketErrorHandler(so socketio.Socket, err error) {
	log.Println("error: ", err)
}

func main() {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	server.On("connection", SocketHandler)
	server.On("error", SocketErrorHandler)

	http.Handle("/socket.io/", server)
	http.Handle("/static/", http.FileServer(http.Dir("./")))
	http.Handle("/", http.FileServer(http.Dir("./templates")))
	log.Println("Serving at localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
