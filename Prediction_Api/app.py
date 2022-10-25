import re
from nltk.corpus import stopwords
import seaborn as sns
from nltk.stem.porter import PorterStemmer
from flask import Flask, request , jsonify
from sklearn.preprocessing import FunctionTransformer
import pickle
from flask_cors import CORS
from flask_restful import Api, Resource
#these are normal declarations
app =   Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
ps = PorterStemmer()
cv = pickle.load(open("vectorizer.pkl", 'rb')) 
api =   Api(app)
classifier = pickle.load(open('model.pkl', 'rb'))  
data = []
# this is for the preprocessing of data that will be sent from the frontend
def get_Proper_words(text):
    p = list(filter(lambda text:text not in set(stopwords.words('english')),text))
    final = " ".join(list(map(lambda word:ps.stem(word),p)))
    return final
    

def cleanUp(text):
    return re.sub('[^A-Za-z0-9]+', ' ',text)
    
def preprocess(a):
    a = cleanUp(a)
    a = a.lower()
    k = a.split()
    final = get_Proper_words(k)
    return final 

def prediction(a):
    k = preprocess(a)
    k = [k]
    X = cv.transform(k)
    y = classifier.predict(X)
    return y[0]

# this is how you make the routes with the requests
class Home(Resource):
    def get(self):
        return jsonify({'message': 'api for ml model use case is working'})
    def post(self):
        global data
        result = request.get_json(force = True)
        print(result['text'])
        text = result['text']
        p = prediction(text)
        # p = re.sub('[^A-Za-z0-9]+', ' ',text)
        # p = p.lower()
        # k = p.split()
        # print("reached till k")
        # t = list(filter(lambda text:text not in set(stopwords.words('english')),k))
        # q = " ".join(list(map(lambda word:ps.stem(word),t)))
        # print("reached till q")
        # q = [q]
        # print("reached till x")
        # X = cv.transform(q)
        # print("reached till y")
        # y = classifier.predict(X)
        if (p == 0):
            res = "not spam"
        else:
            res = "spam"
        ans = {
            'text':text,
            'prediction':res
        }
        data.append(ans)
        return jsonify({'data' : data})

class predict(Resource):
    def get(self):
        return jsonify({
            'data': data
        })

# this is how you make endpoints
api.add_resource(Home,'/')
api.add_resource(predict,'/predict')
# api.add_resource(test,'/test')

if __name__=='__main__':
    app.run(port=8000,debug=True)