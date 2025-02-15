from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = []

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def correct_capitalisation(recipeName: str) -> Union[str | None]:
    new_recipe_name = ""

    for i in range(len(recipeName)):
        if ((i == 0) and (97 <= ord(recipeName[i]) <= 122) and ord(recipeName[i]) != 32):
            new_recipe_name += chr(ord(recipeName[i]) - 32)
        elif ((ord(recipeName[i-1]) == 32) and (97 <= ord(recipeName[i]) <= 122)):
            new_recipe_name += chr(ord(recipeName[i]) - 32)
        elif ((ord(recipeName[i-1]) != 32) and (65 <= ord(recipeName[i]) <= 90) and i != 0):
            new_recipe_name += chr(ord(recipeName[i]) + 32)
        else:
            new_recipe_name += recipeName[i]
    
    return new_recipe_name

def correct_whitespace(recipeName: str) -> Union[str | None]:
    new_recipe_name = ""
    for i in range(len(recipeName)):
        if (ord(recipeName[i - 1]) == 32 and ord(recipeName[i]) == 32):
            pass
        else:
            new_recipe_name += recipeName[i]

    new_recipe_name_2 = ""
    for i in range(len(new_recipe_name)):
        if (ord(new_recipe_name[i]) == 32 and i == 0):
            pass
        elif (ord(new_recipe_name[i]) == 32 and i == len(new_recipe_name) - 1):
            pass
        else:
            new_recipe_name_2 += new_recipe_name[i]
    
    return new_recipe_name_2
    

def correct_ASCII(recipeName: str) -> Union[str | None]:
    new_recipe_name = ""	
    for i in range(len(recipeName)):
        if ((65 <= ord(recipeName[i]) <= 90) or (97 <= ord(recipeName[i]) <= 122)) or (32 == ord(recipeName[i])):
            new_recipe_name += recipeName[i]
        elif ((ord(recipeName[i]) == 45) or (ord(recipeName[i]) == 95)):
            new_recipe_name += " "
    
    return new_recipe_name

def parse_handwriting(recipeName: str) -> Union[str | None]:
	# TODO: implement me
    new_recipe_name = correct_ASCII(recipeName=recipeName)
    new_recipe_name = correct_capitalisation(recipeName=new_recipe_name)
    new_recipe_name = correct_whitespace(recipeName=new_recipe_name)

    if (new_recipe_name == ""):
        return None
    else:   
        return new_recipe_name


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook


def check_for_duplicates(cookbook_array, name):
    for x in cookbook_array:
        if (x.get("name") == name):
            return True
    return False

# I just realized I could have used set instead of this convoluted method. But if it works 🤷. 
# Ofcourse for actual software I will optimize it
def check_for_duplicates_in_recipes(cookbook_array):
    for x in cookbook_array:
        name = x.get("name")
        counter = 0
        for n in cookbook_array:
             if name == n.get("name"):
                  counter += 1
        if counter > 1:
            return True
        
    return False
@app.route('/entry', methods=['POST'])

def create_entry():
	# TODO: implement me

    data = request.get_json()

    if (data.get("type") != "recipe" and data.get("type") != "ingredient"):
        return "Invalid entry type", 400
    elif (data.get("type") == "ingredient" and data.get("cookTime") < 0 ):
        return "Cooktime is impossible", 400
    elif (check_for_duplicates(cookbook_array=cookbook, name=data.get("name"))):
        return "Entry name cannot be same", 400
    elif (data.get("type") == "recipe" ):
        if (check_for_duplicates_in_recipes(data.get("requiredItems"))):
            return "THe items have duplicates", 400
        else:
            cookbook.append(data)
            return "Success", 200
    else:
        cookbook.append(data)
        return "Success", 200


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	# TODO: implement me
	return 'not implemented', 500


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8081)
