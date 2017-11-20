for file in $(find $DIR -type f \( -name "*.jpg" -or -name "*.jpeg" -or -name "*.JPG" \)); do
  echo found $file for optimizing...
  jpegtran -copy comments -optimize -progressive -outfile $file $file
done
