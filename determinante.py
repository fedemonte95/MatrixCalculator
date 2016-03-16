def determinante(X):
    term_list = []
    cols = len(X)
    #If more than 2 rows, reduce and solve in a piecewise fashion
    if cols>2:
        for j in xrange(0,X.cols):
            #Remove i and j columns
            new_x = deepcopy(X)
            del new_x[0]
            new_x.del_column(j)
            #Find the multiplier
            multiplier = X[0][j] * math.pow(-1,(2+j))
            #Recurse to find the determinant
            det = recursive_determinant(new_x)
            term_list.append(multiplier*det)
            return sum(term_list)
    else:
        result = X[0][0]*X[1][1] - X[0][1]*X[1][0]
        print("operacion: ", X[0][0], " * ", X[1][1]," - ", X[0][1],
              " * ", X[1][0], " = ", result)

lista = [[2, 5], [-8, 3]]
determinante(lista)
