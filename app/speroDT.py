from sklearn import tree
from os import getcwd
import pandas as pd
from pprint import pprint

class speroDT:
    def __init__(self):
        X = [ [0,0], [0,1]]
        Y = [0,1]
        clf = tree.DecisionTreeClassifier()
        clf = clf.fit(X,Y)

    def loadDate(self):
        path = getcwd() + "\\datasets\\HollandCode.xlsx"
        data = pd.read_excel( path, sheetname=[0])
        temp = sorted(set(data[0]['Occupational Title']))
        occT = {}
        i = 0
        for x in temp:
            occT[str(x)] = str(i)
            i+=1
        pprint(occT)

s = speroDT()
s.loadDate()