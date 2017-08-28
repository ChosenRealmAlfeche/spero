from sklearn import tree

class speroDT:
    def __init__(self):
        X = [ [0,0], [0,1]]
        Y = [0,1]
        clf = tree.DecisionTreeClassifier()
        clf = clf.fit(X,Y)