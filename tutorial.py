import numpy as np
from numpy.linalg import norm
a = np.array([1,2,3])
b = np.array([1,1,4])
print(np.linalg.norm(a - b))
print(np.dot(a,b)/(norm(a)*norm(b)))