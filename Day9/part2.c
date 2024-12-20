#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <errno.h>
#include <math.h>


#define MAX_LENGTH 21000

int main(){

    //Task1: Reading FILE:
    FILE *input = fopen("/Users/akbarjon/AdventOfCode/Day9/input.txt", "r");

    if(!input){
        perror("Error message:");
        return 1;
    }

    char line[MAX_LENGTH];
    fgets(line, sizeof(line), input);
    fclose(input);

    //Task2: Represent individual blocks

    int length = strlen(line);
    int id = 0;
    char *disk_map[100000];
    int temp;
    int count = 0;
    for(int i = 0; i < length; i++){
        if(i%2 == 0){
            temp = line[i] - '0';
            char *temp_str =(char *)malloc(12);
            sprintf(temp_str, "%d", id);
            while(temp){
                disk_map[count] = (char *)malloc(strlen(temp_str) + 1);
                strcpy(disk_map[count], temp_str);
                count++;
                temp--;
                if(temp == 0) id++;
            }
            free(temp_str);
        }else{
            temp = line[i] - '0';
            while(temp){
                disk_map[count] = (char *)malloc(2);
                strcpy(disk_map[count], ".");
                count++;
                temp--;
            }
        }
    }

    // //move file blocks one at a time:

    int file_count = 1;
    int condition = 1;
    for(int j = count-1; j > 0; j--){
        if(strcmp(disk_map[j], ".") == 0) continue;
        if(strcmp(disk_map[j], disk_map[j-1]) == 0 && strcmp(disk_map[j], ".") != 0){
            file_count++;
            continue;
        }else{
            for(int i = 0; i < j; i++){
                if(strcmp(disk_map[i], ".") == 0){
                    for(int k = i; k < i+file_count; k++){
                        if(strcmp(disk_map[k], ".") != 0){
                            condition = 0;
                            break;
                        }
                    }
                    if(condition == 1){
                        while(file_count > 0){
                            free(disk_map[i]);
                            disk_map[i] = (char *)malloc(strlen(disk_map[j+file_count-1]) + 1);
                            strcpy(disk_map[i], disk_map[j+file_count-1]);
                            strcpy(disk_map[j+file_count-1], ".");
                            i++;
                            file_count--;
                        }
                        break;
                    }
                    condition = 1;
                }
            }
        }
        file_count = 1;
    }

    // checksum algorithm:

    long int check_sum = 0;
    int num;
    for(int i = 0; i < count; i++){
        if(strcmp(disk_map[i], ".") != 0){
            num = atoi(disk_map[i]);
            check_sum += i * num;
        }
    }

    printf("\n%ld\n", check_sum);
    return 0;
}