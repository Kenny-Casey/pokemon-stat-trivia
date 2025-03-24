from flask_restful import Resource,reqparse,request
from db.db_builder import random_pokemon
import random
class GetPokemon(Resource):
    def get(self):
        return random_pokemon()

class GetPokemonWithSeed(Resource):
    def get(self,seed):
        random.seed(seed)
        return random_pokemon()