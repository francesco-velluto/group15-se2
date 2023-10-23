#!/bin/bash

db_name="Office-Queue-Management-System"
user="postgres"
file_name="Office-Queue-Management-System.sql"

if ! [ -e "$file_name" ]; then
 echo "$file_name is not present in this folder!"
 exit 1
fi

psql -U $user -W -d $db_name -a -f $file_name
