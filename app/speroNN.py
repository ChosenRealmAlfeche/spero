import tensorflow as tf
import pandas as pd
from sklearn.model_selection import train_test_split
import numpy as np
from os import listdir,getcwd
from pprint import pprint

class speroNN:

    epoch = 5000
    batch_size= 12
    Random_Seed = 153
    save_path = getcwd() + "/neuralModel/spero.ckpt"

    def __init__(self):

        tf.set_random_seed(self.Random_Seed)

        size_sequence = 10
        size_x = 12
        size_h = 25
        size_y = 6

        self.x = tf.placeholder( tf.float32, [ None, size_sequence, size_x])
        self.y = tf.placeholder( tf.float32, [ None, size_y])

        self.cell = tf.nn.rnn_cell.LSTMCell( size_h, state_is_tuple=True)
        self.cell = tf.nn.rnn_cell.DropoutWrapper(self.cell, output_keep_prob=0.5)
        self.cell = tf.nn.rnn_cell.MultiRNNCell([self.cell], state_is_tuple=True)
        
        self.w = tf.Variable( tf.truncated_normal( [ size_h, size_y]))

        self.sess = tf.Session()

    def loadSession(self):
        path = getcwd() + "\\neuralModel"

        init_op = tf.global_variables_initializer()
        self.sess.run(init_op)

        if listdir(path):
            saver = tf.train.Saver()       
            saver.restore(self.sess, self.save_path)
            print("Model Restored!")

    def loadData(self):
        path = getcwd() + "\\datasets\\SHSData.xlsx"
        data = pd.read_excel( path, sheetname=[0,1,2,3,4,5])
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

        temp_x = []
        #temp_y = []
        y_d = []
        x_d = []
        for x in range(len(x_list)):
            temp_x.append( x_list[x])
            #temp_y.append( y_list[x])
            if(x % 10 == 9):
                x_d.append(temp_x)
                #y_d.append(temp_y[0])
                y_d.append(y_list[x-1])
                temp_x = []
                #temp_y = []
        if temp_x:
            x_d.append(temp_x)
            #y_d.append(temp_y[0])
            y_d.append(temp_y[-1])

        data_x = np.array(x_d, np.float_)
        data_y = np.array(y_d, np.float_)
        return train_test_split(data_x, data_y, test_size=0.20, random_state=self.Random_Seed)

    def minmax(self, x):
        y = x - 75
        z = 100 - 75
        return y / z

    def recommend(self):
        #initialize global variables
        x = self.minmax(self.x)
        val, state = tf.nn.dynamic_rnn(self.cell, x, dtype=tf.float32)
        val = tf.transpose(val, [1,0,2])
        last = tf.gather(val, int(val.get_shape()[0]) - 1)

        return tf.nn.softmax( tf.matmul( last, self.w))

    def trainNN(self):
        train_x, test_x, train_y, test_y = self.loadData()
        
        #forward propagation
        yhat = self.recommend()
        prediction = tf.argmax(yhat,axis=1)

        #back propagation
        cost = tf.reduce_mean( tf.nn.softmax_cross_entropy_with_logits( labels=self.y, logits=yhat))
        update = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

        #calculate error
        mistakes = tf.not_equal( tf.argmax( self.y, 1), prediction)
        error = tf.reduce_mean( tf.cast( mistakes, tf.float32))

        self.loadSession()

        #create saver
        saver = tf.train.Saver()

        #train loop
        epoch = self.epoch
        batch_size = self.batch_size
        no_of_batches = int( len(train_x) / batch_size)

        for i in range(epoch):
            idx = 0
            for j in range(no_of_batches):
                inp, out = train_x[idx:(idx+batch_size)], train_y[idx:(idx+batch_size)]
                idx+=batch_size
                self.sess.run(update, feed_dict={self.x : inp, self.y : out})
            train_accuracy = 1 - (self.sess.run(error, feed_dict={self.x : train_x, self.y : train_y}))
            test_accuracy = 1 - (self.sess.run(error, feed_dict={self.x : test_x, self.y : test_y}))
        
            print("Epoch - %d || training accuracy : %f || test accuracy : %f" % (i, 100 * train_accuracy,100 * test_accuracy))

        saver.save(self.sess, self.save_path, global_step=i) 

    def Input(self,X):
        yhat = self.recommend()
        self.loadSession()
        yhat = self.sess.run()
        

s = speroNN()
s.trainNN()
#train_x, test_x, train_y, test_y = s.loadData()
#sess = tf.Session()
#sess.run(tf.global_variables_initializer())
#sess.run(s.recommend(), feed_dict={s.x : train_x, s.y : train_y})
#print(train_y.shape)
#for i in range(20):
#    print("division : %f || modulo : %f" % ( i / 10, i % 10))
