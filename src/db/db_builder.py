import csv
import random
from .db_utils import *
def reset_score():
    conn = connect()
    cur = conn.cursor()
    drop_sql = """
        DROP TABLE IF EXISTS score_table;
    """
    cur.execute(drop_sql)
    conn.commit()
    conn.close()
    exec_sql_file('src/db/score_schema.sql')
    insert_sql="INSERT INTO score_table(score) VALUES (0);"
    exec_commit(insert_sql)

def rebuild_tables():
    reset_score()
    conn = connect()
    cur = conn.cursor()
    drop_sql = """
        DROP TABLE IF EXISTS pokemon_table;
        DROP TABLE IF EXISTS score_table;
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
                insert_sql="""INSERT INTO pokemon_table(dex_number,name,hp,atk,def,spatk,spdef,spe) VALUES
                    (%s,%s,%s,%s,%s,%s,%s,%s);"""
                data=(id,name,hp,atk,defs,spatk,spdef,spe)
                exec_commit(insert_sql,data)
    


def random_pokemon():
    random_index=random.randrange(1,1294)
    select_sql="SELECT name,hp,atk,def,spatk,spdef,spe FROM pokemon_table WHERE pokemon_table.id=%s"
    data=(random_index,)
    return exec_get_all(select_sql,data)

def get_score():
    select_sql="""SELECT score FROM score_table;"""
    return exec_get_all(select_sql)[0][0]

def check_guess(pokemon,guess):
    answer=pokemon[0][0]
    if(answer.lower()==guess.lower()):
        score=get_score()
        new_score=score+1
        update_sql="""UPDATE score_table
        SET score=%s;"""
        data=(new_score,)
        exec_commit(update_sql,data)
        return "Correct!"
    else:
        return "Incorrect! The Correct Answer Was "+pokemon[0][0]



