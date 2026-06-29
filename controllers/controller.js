//  Importo dati del post
const posts = require('../data/posts');

// Importiamo il file di connessione al database
const connection = require('../data/connection');
const { error } = require('node:console');

// elenco funzioni relative alle rotte della risorsa post

const index = (req, res) => {

    const sql = 'SELECT * FROM posts';
    connection.query(sql, (err, results) => {
        console.log(err);
        
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
        console.log(results);
        
        res.json(results);
    });
    /*res.send("List of posts from the db")
    const tags = req.query.tags;

    if (tags) {
        // filtraggio
        const filteredPosts = posts.filter(post => post.tags.includes(tags));
        return res.json(filteredPosts);
    }*/

    // funzione per bloccare rotta index e attivare middleware errorsHandler
    //  funy.ciao();

    // risponde con la lista posts
    res.json(posts);
}


const show = (req, res) => {
    console.log(req.params);
    const postId = Number(req.params.id);
    console.log(postId);

    // Prepariamo la query
    const sql = 'SELECT * FROM posts WHERE id = ?';
    // prepariamo la sql query per unire post_tag
    const sqlJoin = `
    SELECT posts.title 
    FROM tags
    JOIN post_tag ON post_tag.tag_id = tags.id
    JOIN posts ON post_tag.post_id = posts.id
    WHERE tags.id = ?`;

    // eseguire la query
    connection.query(sql, [postId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }

        //console.log(results);
        
        if (results.length === 0) return res.status(404).json({ error: true, message: '404 Post non trovato'});
        
        connection.query(sqlJoin, [postId], (err, postsResults) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: true, message: 'Internal Server Error'});
            }
            // aggiungi gli posts all'oggetto tag
            console.log(postsResults);
            tag.posts = postsResults.map(post => post.title);
            console.log(tag);
            

        res.json(results[0]);
        })
    });
/*
    // cerchiamo il post tramite id
    const singlePost = posts.find(post => post.id === postId);
    //imposto lo status 404
    if (!singlePost) {
        return res.status(404).json({ error: true, message: '404 Post not found' });
    }


    res.json(singlePost);*/
    
}


// Store una nuova Post
const store = (req, res) => {
    console.log(req.body);
    //res.json({ message: 'Store a new post'});

// Creiamo un nuovo id incrementando l'ultimo id presente
const newId = posts[posts.length - 1].id + 1;
// Creiamo un nuovo post
const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  }
    // Aggiungiamo il nuovo post
    posts.push(newPost);

    console.log(posts);
    
    // Restituiamo lo status corretto e il post creato
    res.status(201).json(newPost);
}
//Modifica integrale post
const update = (req, res) => {
    //res.json({ message: 'Modifica integrale post'})
    // recuperiamo l'id dall' URL e trasformiamolo in numero
  const id = parseInt(req.params.id)
 
  // cerchiamo il pizza tramite id
  const post = posts.find(post => post.id === id);
  if (!post) {
        res.status(404);
 
        return res.json({
        error: "Not Found",
        message: "Post non trovata"
        })
    }
    // Aggiorniamo il post
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // Controlliamo
    console.log(posts);

    // Restituiamo il post creato
    res.json(post);
}

//Modifica parziale del post
const modify = (req, res) => {
    //res.json({ message: 'Modifica parziale del post'})
    // Recuperiamo l'id
    const id = parseInt(req.params.id)

    const post = posts.find(post => post.id === id);

     if(!post) {
        //res.status(404);

        return res.status(404).json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    const modifyPost = req.body;

    //Aggiorniamo il post
    post.title = modifyPost.title ?? post.title;
    post.content = modifyPost.content ?? post.content;
    post.image = modifyPost.image ?? post.image;
    post.tags = modifyPost.tags ?? post.tags;

    // Controlliamo il post
    console.log(posts);
    //Restituiamo il post creato
    res.json(post);
    
}

function destroy (req, res) {
    // recuperiamo l'id dall' URL
    const { id } = req.params;
    //Eliminiamo la post dal menu
    connection.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post non trovata'})
        }
        res.sendStatus(204).end();
    });
};

module.exports = {index, show, store, update, modify, destroy};