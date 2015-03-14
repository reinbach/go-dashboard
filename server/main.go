package main

import (
	"log"
	"net/http"

	"github.com/googollee/go-socket.io"
)

func SocketHandler(so socketio.Socket) {
	log.Println("connectioned")
	so.Join("chat")
	so.On("chat message", func(msg string) {
		log.Println("emit: ", so.Emit("chat message", msg))
		so.BroadcastTo("chat", "chat message", msg)
	})
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
