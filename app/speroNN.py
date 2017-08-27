import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np

class speroNN:
    def __init__(self):
        self.Random_Seed = 153

        tf.set_random_seed(self.Random_Seed)

        size_batch = 4
        size_x = 12
        size_h = 12
        size_y = 6

        self.x = tf.placeholder( tf.float32, [ None, size_batch, size_x])
        self.y = tf.placeholder( tf.float32, [ None, size_y])

        self.cell = tf.nn.rnn_cell.LSTMCell( size_h, state_is_tuple=True)

        self.w = tf.Variable( tf.truncated_normal( [ size_h, size_y]))
    
    def loadData(self):
        data = pd.read_excel("datasets\\SHSData.xlsx",sheetname=[0,1,2,3,4,5])
        lsMap = ['Filipino', 'English', 'Mathematics', 'Science', 
        'Araling Panlipunan (AP)', 'MAPEH', 'Realistic', 
        'Investigate', 'Artistic', 'Social', 'Enterprising', 'Conventional']
        rsMap = {'STEM' : 0, 'ABM' : 1, 'HUMMS' : 2, 'GAS' : 3, 'Arts & Design' : 4, 'Sports Track' : 5}
        
        size = 0
        for i in range(len(data)):
            size+=len(data[i])
        
        x_list = []
        y_list = []
        for i in range(len(data)):
            for j in range(len(data[i])):
                x_entry = []
                for xside in lsMap:
                    x_entry.append( data[i][xside][j])
                y_entry = [0,0,0,0,0,0]
                y_entry[ rsMap[ data[i]["Track"][j]]] = 1
                x_list.append(x_entry)
                y_list.append(y_entry)
        data_x = np.array(x_list, np.float_)
        data_y = np.array(y_list, np.float_)
        print(size)
        return train_test_split(data_x, data_y, test_size=0.20, random_state=self.Random_Seed)

    def recommend(self):
        train_x, test_x, train_y, test_y = self.loadData()

        val, state = tf.nn.dynamic_rnn(self.cell, self.x, dtype=tf.float32)
        last = tf.gather(val, int(val.get_shape()[0]) - 1)

        return tf.nn.softmax( tf.matmul( last, self.w))

    def trainNN(self):
        train_x, test_x, train_y, test_y = self.loadData()
        
        #forward propagation
        yhat = self.recommend()
        prediction = tf.argmax(yhat,axis=1)

        #back propagation
        cost = tf.reduce_mean( tf.nn.softmax_cross_entropy_with_logits( labels=self.y, logits=yhat))
        update = tf.train.AdamOptimizer(0.03).minimize(cost)