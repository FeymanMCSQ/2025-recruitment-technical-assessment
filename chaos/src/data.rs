//a web framework http helps with the status code, response turns data into a json response
//extracts and returns json data in requests and responses.
use axum::{http::StatusCode, response::IntoResponse, Json};
//this is used to serialize (convert rust structs to json) and vice versa
use serde::{Deserialize, Serialize};

//We import a flexible data type that supports any json value
use serde_json::Value;


//This is a public async function,  now this function gets a JSON payload, and it
//turns that paylod into a DataRequest struct, and then that struct is worked up, and
//it returns a HTTP response
pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {

    let mut sum = 0;
    let mut characters = 0;
    // Calculate sums and return response
    //Take a guess

    //This iterates over the array in request.data
    for item in &request.data {
        //checks each item, if it is a string counts the chars, otherwise adds the numbers
        //Checks if the number is integer or float, anyway adds them.
        match item {
            Value::String(s) => characters += s.chars().count(),
            Value::Number(n)=> {
                if let Some(num) = n.as_i64() {
                    sum += num;
                }
                else if let Some(num) = n.as_f64() {
                    sum += num.round() as i64; // Converts floats to integers
                }
            },
            _=> println!("Unsupported value type!")
        }
    }

    // println!("The number of chars are: {}", {characters});
    // println!("The sum is: {}", {sum});
    
    let response = DataResponse {
        string_len: characters,
        int_sum: sum,
    };
    //Returns status code 200, and the Json response as the body
    (StatusCode::OK, Json(response))
}

//Incoming data
#[derive(Deserialize, Debug)]
pub struct DataRequest {
    // Add any fields here
    pub data: Vec<Value>
}

//Outgoing data
#[derive(Serialize)]
pub struct DataResponse {
    // Add any fields here
    pub string_len: usize,
    pub int_sum: i64,
}
