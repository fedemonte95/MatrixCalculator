
# Programa para multiplicar matrices

## Diagrama de entradas, sálidas y limitaciones
##
##              m1        m2
##                |            |
##                v          v
##  __ __ __ __ __ __ __ __
## |                       |
## |      multiplicación   |    limitacion :  valores de m1 y m2  deben ser enteros
## |          matrices     |
## |__ __ __ __ __ __ __ __|
##
##              |
##              v
##            mR


#casos

##m1 = [[1, 2], [3, 4]]          # matriz 2x2
##m2 = [[1, 2, 3], [4, 5, 6]]    # matriz 2x3

m1 = [[4,1,2],[1,1,0],[0,0,2]]    # matriz 3x3
m2 = [[3,1,5],[2,-1,4],[1,0,3]]    # matriz 3x3

##m1 = [[6],[1],[8],[7],[0]]  # matriz  5x1
##m2 = [[1,6,0,5,-2]]          # matriz  1x5

##m1 = [[3,2,6],[-2,4,6]]  # matriz 2x3
##m2 = [[2],[-4],[6]]          # matriz 3x1

def multiplicacionMatriz(m1,m2):
    # validación de producto de matrices
    fila_m1 = len(m1)
    columna_m1 = len(m1[0])
    fila_m2 = len(m2)
    columna_m2 = len (m2[0])

    if columna_m1 != fila_m2:
        print ('número de columnas de la Matriz 1 no es igual al numero de filas de la matriz 2')
        return

    mR = []
    for i in range(len(m1)):
        mR.append([0]*(len(m2[0])))  # se agregan los valores a la nueva lista para mostrar el resultado

    for i in range(len(m1)):  # se recorre la matriz1 de acuerdo a su largo
        for j in range(len(m2[0])): # se recorre la matriz2 en su primera sublistade acuerdo a su largo
            for k in range(len(m2)): # se recorre la matriz2 de acuedo a su largo
                mR[i][j] += m1[i][k] * m2[k][j] # la matrizR es el resultado de sumarla al producto de las pocisiones recorridas en la matriz1 y matriz2

    return mostrarMatrizProd(mR) # se llama la función mostrarMatrizProd() para acomodar la matriz en filas


def mostrarMatrizProd(mR):
    for fila in mR: # se recorre la matrizR
        print(fila)  # matriz acomodada






# Programa  para  sumar matrices

## Diagrama de entradas, sálidas y limitaciones
##
##              m        n
##                |        |
##                v        v
##  __ __ __ __ __ __ __ __
## |                                |
## |            suma           |    limitacion :  valores de m1 y m2  deben ser enteros
## |          matrices        |
## |__ __ __ __ __ __ __ __ |
##
##              |
##              v
##            sm



def sumaMatrices(m,n):
    if len(m) != len(n): # validación para comprobar su validez
        print("Las dos matrices a sumar no tienen las mismas dimenciones")
    else:
        sm=[[m[i][j]+n[i][j] for j in range(len(m))] for i in range(len(n))] # se recorren ambas matrices en un for y se suman las posiciones de ambas listas
        return mostrarMatrizSum(sm) # se llama la función mostrarMatrizSum() para acomodar en filas

def mostrarMatrizSum(sm):
    for fila in sm: # se recorre la matriz suma
        print(fila) # matriz acomodada

vect1 = [[-10, 2],[33,30],[34,25]]
vect2 = [[-1,5],[2,-2],[3, 5]]

def sumaVectores(vect1, vect2):
    vect3 = [] # lista vacia que se mutando en cada iteración
    for i in range(len(vect1)): # se recorre el vector1 de acuerdo a su largo
        vect3.append(vect1[i]-vect2[i]) # se agrega a vector3 la suma de las pociones recorridas de los vectores 1 y 2
    print(vect3) # se muestra el resultado al sumar los dos vectores de entrada
sumaVectores(vect1, vect2)

