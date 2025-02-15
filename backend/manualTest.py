from typing import List, Dict, Union

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
    return recipeName

recipeName = input("Enter the recipe name: ")
parse_handwriting(recipeName=recipeName)

