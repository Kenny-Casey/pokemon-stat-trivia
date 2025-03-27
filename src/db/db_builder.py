import csv
import random
from .db_utils import *

def rebuild_tables():
    conn = connect()
    cur = conn.cursor()
    drop_sql = """
        DROP TABLE IF EXISTS pokemon_table;
    """
    cur.execute(drop_sql)
    conn.commit()
    conn.close()
    exec_sql_file('src/db/pokemon_schema.sql')
    with open('pokedex.csv',newline='') as csvfile:
        pokemon_reader=csv.reader(csvfile, delimiter=',', quotechar='|')
        next(pokemon_reader)
        for row in pokemon_reader:
            id=int(row[0])
            if(id>0):
                name=row[1]
                hp=int(row[9])
                atk=int(row[10])
                defs=int(row[11])
                spatk=int(row[12])
                spdef=int(row[13])
                spe=int(row[14])
                bst=int(row[15])
                insert_sql="""INSERT INTO pokemon_table(dex_number,name,hp,atk,def,spatk,spdef,spe,bst) VALUES
                    (%s,%s,%s,%s,%s,%s,%s,%s,%s);"""
                data=(id,name,hp,atk,defs,spatk,spdef,spe,bst)
                exec_commit(insert_sql,data)
    


def random_pokemon():
    select_sql="SELECT name,hp,atk,def,spatk,spdef,spe,bst FROM pokemon_table"
    pokemon=exec_get_all(select_sql)
    length=len(pokemon)
    random_index=random.randrange(0,length-1)
    return pokemon[random_index]


def check_guess(pokemon,guess):
    answer=pokemon[0]
    if(answer.lower()==guess.lower()):
        return "Correct!"
    else:
        return "Incorrect! The Correct Answer Was "+pokemon[0]
    

# def seed_finder():
#     seed=0
#     while True:
#         random.seed(seed)
#         pokemon=random_pokemon()[0]
#         print(pokemon)
#         if(pokemon=="Volcarona"):
#             print(seed)
#             break
#         seed=seed+1

# seed_finder()


