from flask_restful import Resource,reqparse,request
from db.db_builder import *
import random
class GetPokemon(Resource):
    def get(self,fully_evolved):
        return random_pokemon(fully_evolved)
        


class GetPokemonWithSeed(Resource):
    def get(self,seed,fully_evolved):
        random.seed(seed)
        return random_pokemon(fully_evolved)