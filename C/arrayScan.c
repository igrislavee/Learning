#include <stdio.h>
#include <stdbool.h>

int main() {
    int arrN;
    int arrE;
    int result;
    printf("How many arrays do you want?: ");
    scanf("%d", &arrN);
    printf("How many elements do you want each array to have?: ");
    scanf("%d", &arrE);
    int array[arrN][arrE];

    for(int n = 0; n < arrN; n++) {
        for(int i = 0; i < arrE; i++){
        printf("give a number for the element %d of array %d: ", (i + 1), (n + 1));
        scanf("%d", &array[n][i]);
        }
    }
    
    printf("\nNow each element of an array will be added together while the arrays will be multiplied");
    for(int n = 0; n < arrN; n++) {
        for(int i = 0; i < arrE; i++){
        result = result + array[n][i];
        }
    }
    printf("\nresult: %d", result);
        fgets()
return 0;
}

int factorial(int n){
    if(n>1){
        return (n*factorial(n-1));
    } else {return n;}
}