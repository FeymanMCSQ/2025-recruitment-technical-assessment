//uses axum, the routing::post tells us that we send psot requests
// and the Router defines the API
use axum::{routing::post, Router};

//imports the module data, which has the process data function
mod data;

//tokio is used to make the function async with concurrecny
#[tokio::main]

async fn main() {

    //Router::new() creates a new axum router, which is kinda like an API blueprint
    //.route("/process_data, post(data::process_data)") adds a post route to process_data
    //when the post request is made, the data::process_data is called
    let app = Router::new().route("/process_data", post(data::process_data));

    //sets up the server and a port, at my ip address and 3000
    axum::Server::bind(&"127.0.0.1:3000".parse().unwrap())
    //converts router app into service
        .serve(app.into_make_service())
    //waits whi it is set up
        .await
    //bitches in case of error
        .unwrap();
}
