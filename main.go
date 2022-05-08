package main

import (
	"embed"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/dist
var assets embed.FS

type CtxKey int

const (
	AccessCtxKey CtxKey = iota
	BaseApiKey
	NumPagesKey
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
	access := os.Getenv("ACCESS")
	if access == "" {
		log.Fatal("please provide access key in .env")
	}
	fmt.Println(access)

	app := NewApp(appConfig{
		baseApi:   "https://api.unsplash.com",
		accessKey: access,
	})

	// Create application with options
	err = wails.Run(&options.App{
		Title:     "unsplash-downloader",
		Width:     1024,
		Height:    768,
		Assets:    assets,
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err)
	}
}
