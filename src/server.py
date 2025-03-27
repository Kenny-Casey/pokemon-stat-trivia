from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from db.db_builder import rebuild_tables
from api.getpokemon import *
app = Flask(__name__) 
CORS(app) 
api = Api(app) 


api.add_resource(GetPokemon, '/pokemon/<string:fully_evolved>')
api.add_resource(GetPokemonWithSeed, '/pokemon/<int:seed>//<string:fully_evolved>')

if __name__ == '__main__':
    app.run(debug=True)