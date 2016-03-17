/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package inversa;
 
import static java.lang.Math.pow;
 
/**
 *
 * @author jeffrey-debian
 */
public class Matriz {
    private int columns;
    private int rows;
    public double [][] M;
     
    public Matriz(int pRows, int pColumns){
        columns = pColumns;
        rows = pRows;
        M = new double [pRows][pColumns];
    }
       
    public double cofactor(int row, int column){
        Matriz R = new Matriz (rows - 1, columns -1);
        int k = 0, l = 0;
        for (int i = 0; i < rows; i++){
            for (int j = 0; j < columns; j++){
                if (i == row || j == column){
                    continue;
                }
                else{
                    R.add(l, k, M[i][j]);
                    k = (k + 1) % (this.rows - 1);
                    if (k == 0) l++;
                }
            }
        }
        return pow(-1, row + column) * determinante(R.M);
    }
     
    public Matriz matrizCofactores(){
        Matriz cofactores = new Matriz(rows, columns);
        for (int i = 0; i < rows; i++){
            for (int j = 0; j < columns; j++){
                cofactores.add(i, j, cofactor(i, j));
            }
        }
        return cofactores;
    }
     
    public void add(int row, int column, double value){
        M [row][column] = value;
    }
     
    public double determinante(double [][] pM){
        double R = 0;
        if (pM.length == 1) {
            R = pM[0][0];
            return R;
        }
        if (pM.length == 2){
            R = pM[0][0] * pM[1][1] - pM[0][1] * pM[1][0];
            return R;
        }
         
        double[][] N = new double[pM.length-1][pM[0].length-1]; 
        for (int x = 0; x < pM[0].length; x++) {           
            for (int i = 1; i < pM.length; i++) {
                int jReducida = 0;
                for (int j = 0; j < pM[0].length; j++) {
                    if (x != j) {
                        N[i-1][jReducida] = pM[i][j];
                        jReducida++;
                    }
                }
            }
            R += Math.pow(-1, x) * pM[0][x] * determinante(N);
        }
        return R;
    }
     
    public Matriz transpuesta(){
        Matriz R = new Matriz(columns, rows);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                R.add(j, i, M[i][j]);
            }
        }
        return R;
    }
         
    public Matriz inversaCofactores() throws Exception{
        if (rows != columns){
            throw new Exception("La matriz no es cuadrada");
        }
        else{
            Matriz R = new Matriz (rows, columns);
            double determinante = determinante(M);
            if(determinante == 0){
                throw new Exception("El determinante es 0, por lo que no tiene inversa");
            }
            else{
                for (int i = 0; i < rows; i++) {
                    for (int j = 0; j < columns; j++) {
                        R = matrizCofactores().transpuesta().multiN(1/determinante);
                    }
                }
                return R;
            }
        }
    }
     
    public Matriz multiN(double Num){
        Matriz R = new Matriz(rows, columns);
        for (int i = 0; i < M.length; i++) {
            for (int j = 0; j < M[i].length; j++) {
                R.add(i, j, M[i][j] * Num);
            }
        }
        return R;
    }
     
    public double[][] multiM(double [][] N) throws Exception{
        if (M.length != N[0].length) {
            throw new Exception("La cantidad de filas de la matriz A no es igual a la cantidad de columnas de la matriz B");
        }
        double R [][] = new double[M.length][N[0].length] ;
        for (int i = 0; i < M.length; i++) {
            for (int j = 0; j < N[0].length; j++) { 
                for (int k = 0; k < M[i].length; k++) {
                    R[i][j] += M[i][k] * N[k][j];
                }
            }
        }
        return R;
    }
     
    @Override
    public String toString(){
        String out = "";
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                out += M[i][j] + " ";
            }
            out += "\n";
        }
        return out;
    }
}