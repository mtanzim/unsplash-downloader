package main

import (
	"context"
	"fmt"

	"github.com/mtanzim/unsplash-wallpapers/pkg/downloader"
)

type appConfig struct {
	baseApi   string
	accessKey string
}

// App struct
type App struct {
	ctx    context.Context
	config appConfig
}

// NewApp creates a new App application struct
func NewApp(config appConfig) *App {
	return &App{config: config}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Download(destPath, collectionId string, numPages int) string {

	access := a.config.accessKey
	baseApi := a.config.baseApi

	fmt.Println(destPath)
	fmt.Println(collectionId)

	downloader := downloader.NewDownloader(baseApi, access, destPath, numPages)
	downloader.Download(collectionId)
	return "Completed"
}
