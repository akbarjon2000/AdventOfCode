#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_LENGTH 256
#define MAX_LINES 100

int remove_duplicates(int arr[5000][2], int length);

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

    int positions[4000][2];
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
    int anti_nodes[5000][2];
    int count = 0;
    int row_diff;
    int col_diff;
    int temp_row;
    int temp_col;    

    for(int i = 0; i < counter-1; i++){
        for(int j = i + 1; j < counter; j++){
            if(lines[positions[i][0]][positions[i][1]] == lines[positions[j][0]][positions[j][1]]){
                row_diff = positions[j][0] - positions[i][0];
                col_diff = positions[j][1]- positions[i][1];
                temp_row= positions[i][0] - row_diff;
                temp_col= positions[i][1] - col_diff;

                while((temp_row >= 0 && temp_row < 50) && temp_col >= 0 && temp_col < 50){
                    
                    anti_nodes[count][0] = temp_row;
                    anti_nodes[count][1] = temp_col;

                    temp_row = temp_row - row_diff;
                    temp_col = temp_col - col_diff;
                    count++;
                }
                temp_row = positions[j][0] + row_diff;
                temp_col = positions[j][1] + col_diff;
                while((temp_row >=0 && temp_row < 50) && (temp_col >=0 && temp_col < 50)){

                        anti_nodes[count][0] =temp_row;
                        temp_row = temp_row + row_diff;

                        anti_nodes[count][1] = temp_col;
                        temp_col = temp_col + col_diff;
                        count++;
                }
                        // printf("%d ", count);
                
                
            }
        }
    }

    for(int i = 0; i < counter; i++){
        anti_nodes[count][0] = positions[i][0];
        anti_nodes[count][1] = positions[i][1];
        count++;
    }
    remove_duplicates(anti_nodes, count);
    // printf("\n%d", count);
    for (int i = 0; i < line_count; i++) {
        free(lines[i]);
    }
    return 0;
    
}



int remove_duplicates(int arr[5000][2], int length) {
    int unique[5000][2];
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