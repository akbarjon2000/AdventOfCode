#include <stdio.h>
#include <errno.h>

int main(){
    FILE * input;
    input = fopen("/Users/akbarjon/AdventOfCode/Day6/input.txt", "r");
    if(input == NULL){
        perror("Error message: ");
    };
    char *map;
    while(!feof(input)){
        fgets(map, EOF, input);
        printf("%s", map);
    }
    return 0;
}