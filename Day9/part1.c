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
    // printf("%s\n", line);

    //Task2: Represent individual blocks

    int length = strlen(line);
    int id = 0;
    char *disk_map[100000];
    int temp;
    long int count = 0;
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

    // for(int i = 0; i < count; i++){
    //     printf("%s", disk_map[i]);
    // }

    // //move file blocks one at a time:


    for(int j = count-1; j >= 0; j--){
        for(int i = 0; i < j; i++){
            if(strcmp(disk_map[i], ".") == 0){
                strcpy(disk_map[i], disk_map[j]);
                strcpy(disk_map[j], ".");
                break;
            }
        }
    }
    printf("\n");
    for(int i = 0; i < count; i++){
        printf("%s", disk_map[i]);
    }

    // checksum algorithm:
    count = 0;
    long int check_sum = 0;
    int num;
    while(strcmp(disk_map[count], ".") != 0){
        num = atoi(disk_map[count]);
        check_sum += count * num;
        count++;
        // printf("%ld", check_sum);
    }

    printf("\n%ld", check_sum);
    return 0;
}