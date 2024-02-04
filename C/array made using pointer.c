#include <stdio.h>
#include <stdlib.h>

int main() {
    int* ages;
    ages = (int*) malloc(4 * sizeof(int));

    if(ages == NULL){
        printf("error");
        return 0;
    }

     for(int i = 0; i < 4; i++){
        printf("\nenter value number %d: ", i + 1);
        scanf("%d", ages + i);
     }

     ages = realloc(ages, 6*sizeof(int));
     if(ages == NULL){
        printf("error");
        return 0;
     }


    ages[4] = 32;
    ages[5] = 59;

    for(int i = 0; i < 6; i++){
        printf("\nentered number is: %d", ages[i]);
     }
    /*
     for(int i = 5; i < 6; i++){
        printf("\nenter value number %d: ", i + 1);
        scanf("%d", ages + i);
     }
    */
   return 0;
}