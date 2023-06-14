package note

import (
	"context"
	"encore.dev/storage/sqldb"
)

type Note struct {
	ID       string `json:"id"`
	Text     string `json:"text"`
	CoverURL string `json:"cover_url"`
}

//encore:api public method=POST path=/note
func Save(ctx context.Context, note *Note) (*Note, error) {
	err := insert(ctx, note.ID, note.Text, note.CoverURL)
	if err != nil {
		return nil, err
	}
	return note, nil
}

//encore:api public method=GET path=/url/:id
func Get(ctx context.Context, id string) (*Note, error) {
	note := &Note{ID: id}
	err := sqldb.QueryRow(ctx, `
		SELECT text, cover_url FROM note
		WHERE id = $1
	`, id).Scan(&note.Text, &note.CoverURL)
	return note, err
}

func insert(ctx context.Context, id, text, coverURL string) error {
	_, err := sqldb.Exec(ctx, `
		INSERT INTO note (id, text, cover_url) VALUES ($1, $2, $3)
		ON CONFLICT (id) DO UPDATE SET text=$2, cover_url=$3
	`, id, text, coverURL)
	return err
}
