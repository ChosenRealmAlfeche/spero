from sklearn import tree
from os import getcwd
import pandas as pd
from pprint import pprint
import numpy as np

class speroDT:
    def __init__(self):
        X,Y = self.loadDate()
        self.clf = tree.DecisionTreeRegressor()
        epoch = 100
        for i in range(epoch):
            self.clf = self.clf.fit(X,Y)
            accuracy = 100 * np.mean( np.not_equal( self.clf.predict(X), Y))
        #pprint(self.clf.predict(X[0]))
        #for i in range(len(Y)):
        #pprint(np.equal(self.clf.predict(X[0]),Y[0]))
            #print(accuracy)
        self.predict_proba(X[0:1])

    def predict_proba(self, X):
        x = self.clf.predict(X)
        rng =len(x[0])
        s = []
        for i in rng:
            for i in rng:
                if not i in s:
                    gIdx = i
                    break
            for j in rng:
                if x[0][gIdx] < x[0][j]:
                    if not j in s:
                        gIdx = j
            s.append(gIdx)
        ret = []
        for i in s:
            ret.append(tmap[i])
        return ret


    def loadDate(self):
        path = getcwd() + "\\datasets\\HollandCode.xlsx"
        data = pd.read_excel( path, sheetname=[0])
        x_d = {"R" : 0, "I" : 1, "A" : 2, "S" : 3, "E" : 4, "C" : 5, "STEM" : 6, "ABM" : 7, "HUMMS" : 8, "GAS" : 9, "Sports" : 10, "ArtsDesign" : 11}
        temp = sorted(set(data[0]['Occupational Title']))
        occT = {}
        i = 0
        for x in temp:
            occT[str(x)] = i
            i+=1
        
        x = np.zeros([len(data[0]), 12])
        y = np.zeros([len(data[0]),len(occT)])
        
        #pprint(occT)
        
        for j in range(len(data[0])):
            x[j][(x_d[data[0]['HOC Code'][j][0]])] = 3
            x[j][(x_d[data[0]['HOC Code'][j][1]])] = 2
            x[j][(x_d[data[0]['HOC Code'][j][2]])] = 1
            x[j][(x_d[data[0]['Track'][j]])] = 1
            y[j][occT[data[0]['Occupational Title'][j]]] = 1
            #d[j][x_d[ data[0]['1'][0]]]

        return x,y


        

s = speroDT()
#s.loadDate()