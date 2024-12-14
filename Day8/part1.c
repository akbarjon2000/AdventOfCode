#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_LENGTH 256
#define MAX_LINES 100

int remove_duplicates(int arr[3000][2], int length);

int main(){
    FILE *input = fopen("/Users/akbarjon/AdventOfCode/Day8/input.txt", "r");

    if(!input){
        perror("Error message:");
        return 1;
    }

    char *lines[MAX_LINES];
    int line_count = 0;
    char line[MAX_LENGTH];
    
    while(fgets(line, sizeof(line), input) != NULL){

        line[strcspn(line, "\n")] = '\0';
        lines[line_count] = (char *)malloc(sizeof(line) + 1);

        if(lines[line_count] == NULL){
            perror("Memory allocation failed:");
            fclose(input);
            return 1;
        }

        strcpy(lines[line_count], line);
        line_count++;
    }

    fclose(input);

    int positions[300][2];
    int counter = 0;
    int line_len = strlen(lines[0]);
    for(int i = 0; i < line_count; i++){
        for(int j = 0; j < line_len;j++){
            if(lines[i][j] != '.'){
                positions[counter][0] = i;
                positions[counter][1] = j;
                counter++;
            }
        }
    }
    int anti_nodes[3000][2];
    int count = 0;
    int row_diff;
    int col_diff;

    for(int i = 0; i < counter-1; i++){
        for(int j = i + 1; j < counter; j++){
            if(lines[positions[i][0]][positions[i][1]] == lines[positions[j][0]][positions[j][1]]){
                row_diff = positions[j][0] - positions[i][0];
                if(positions[i][0] - row_diff >= 0 && positions[i][0] - row_diff < line_count){
                    col_diff = positions[j][1]- positions[i][1];
                    if(positions[i][1] - col_diff >=  0 && positions[i][1] - col_diff < line_len){
                        anti_nodes[count][0] = positions[i][0] - row_diff;

                        anti_nodes[count][1] = positions[i][1] - col_diff;

                        count++;
                    }
                }
                if((positions[j][0] + row_diff < line_count) && (positions[j][0] + row_diff >=0)){
                    col_diff = positions[j][1]- positions[i][1];
                    if((positions[j][1] + col_diff < line_len) && (positions[j][1] + col_diff >=0)){
                        anti_nodes[count][0] = positions[j][0] + row_diff;

                        anti_nodes[count][1] = positions[j][1] + col_diff;

                        count++;
                    }
                }
                
            }
        }
    }

    remove_duplicates(anti_nodes, count);

    for (int i = 0; i < line_count; i++) {
        free(lines[i]);
    }
    return 0;
    
}



int remove_duplicates(int arr[3000][2], int length) {
    int unique[3000][2];
    int counter = 0;
    int exist = 0;
    for(int i = 0; i < length;i++){
        for(int j = 0; j < counter; j++){
            if(unique[j][0] == arr[i][0] && unique[j][1] == arr[i][1]){
                exist = 1;
            }
        }
        if(!exist){
            unique[counter][0] = arr[i][0];
            unique[counter][1] = arr[i][1];
            counter++;
        }
        exist = 0;
    }
    printf("%d", counter);
    return counter;
}


