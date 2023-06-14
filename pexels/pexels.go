package pexels

import (
	"context"
	"encoding/json"
	"net/http"
)

var secrets struct {
	PexelsApiKey string
}

// Object that mirrors the response from the Pexels API.
type SearchResponse struct {
	TotalResults int `json:"total_results"`
	Page         int `json:"page"`
	PerPage      int `json:"per_page"`
	Photos       []struct {
		Id              int    `json:"id"`
		Width           int    `json:"width"`
		Height          int    `json:"height"`
		Url             string `json:"url"`
		Photographer    string `json:"photographer"`
		PhotographerUrl string `json:"photographer_url"`
		PhotographerId  int    `json:"photographer_id"`
		AvgColor        string `json:"avg_color"`
		Src             struct {
			Original  string `json:"original"`
			Large2X   string `json:"large2x"`
			Large     string `json:"large"`
			Medium    string `json:"medium"`
			Small     string `json:"small"`
			Portrait  string `json:"portrait"`
			Landscape string `json:"landscape"`
			Tiny      string `json:"tiny"`
		} `json:"src"`
		Liked bool   `json:"liked"`
		Alt   string `json:"alt"`
	} `json:"photos"`
	NextPage string `json:"next_page"`
}

//encore:api public method=GET path=/images/:query
func Search(ctx context.Context, query string) (*SearchResponse, error) {
	// Create a new http client to proxy the request to the Pexels API.
	URL := "https://api.pexels.com/v1/search?query=" + query
	client := &http.Client{}
	req, _ := http.NewRequest("GET", URL, nil)

	// Add authorization header to the req with the API key.
	req.Header.Set("Authorization", secrets.PexelsApiKey)

	// Make the request, and close the response body when we're done.
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	// Decode the data into the searchResponse struct.
	var searchResponse *SearchResponse
	err = json.NewDecoder(res.Body).Decode(&searchResponse)
	if err != nil {
		return nil, err
	}

	return searchResponse, nil
}
