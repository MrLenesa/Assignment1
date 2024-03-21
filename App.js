import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';

const coursesData = [
  {
    id: 1,
    name: 'Probability & statistics',
    description: ' Probability and statistics are branches of mathematics that deal with the analysis, interpretation, and prediction of random phenomena and uncertainty. Probability involves the study of random events and the likelihood of their occurrence, while statistics focuses on collecting, organizing, analyzing, and interpreting data to make informed decisions and draw conclusions. Probability and statistics are fundamental in various fields such as science, engineering, economics, finance, and social sciences.',
    image: './assets/probability.jpg',
  },
  {
    id: 2,
    name: 'Database Systems',
    description: 'Database systems refer to software systems designed to manage, store, and retrieve data efficiently. These systems use a structured format to organize data and provide mechanisms for querying, updating, and maintaining the data. Database systems can be relational (e.g., MySQL, PostgreSQL, Oracle) or non-relational (e.g., MongoDB, Cassandra), and they are used in a wide range of applications such as web development, business intelligence, e-commerce, and more.',
    image: './assets/database.webp',
  },
  {
    id: 3,
    name: 'Java Programing I',
    description: 'Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle). Java programming involves writing code in the Java language to create applications, websites, and software that can run on any platform with the Java Virtual Machine (JVM). Java is known for its "write once, run anywhere" philosophy, robustness, and extensive libraries and frameworks.',
    image: './assets/java.png',
  },
  {
    id: 4,
    name: 'C++ programing II',
    description: ' C++ is a powerful, general-purpose programming language that was developed as an extension of the C programming language. C++ programming involves writing code to create applications, games, system software, and more. It is known for its performance, flexibility, and extensive support for object-oriented programming (OOP) features such as classes, inheritance, and polymorphism.',
    image: './assets/c++.png',
  },
  {
    id: 5,
    name: 'Mobile Device Programing',
    description: ' Mobile device programming refers to the process of developing applications specifically for mobile devices such as smartphones and tablets. This typically involves using programming languages and frameworks such as Java or Kotlin for Android development, Swift or Objective-C for iOS development, and frameworks like React Native or Flutter for cross-platform mobile development. Mobile device programming allows developers to create apps that leverage device-specific features such as touchscreens, cameras, GPS, and sensors.',
    image: './assets/mobile.jpg',
  },
];

const CourseItem = ({ course, onRate }) => {
  const [rating, setRating] = useState(course.rating);

  const handleRateCourse = () => {
    if (rating >= 6) {
      Alert.alert('Maximum Rating Reached', 'You have already rated this course with the maximum score.');
      return;
    }
    const newRating = rating + 1; // Increment rating
    setRating(newRating);
    // Update rating in the backend/database
    onRate(course.id, newRating);
  };

  return (
    <View style={{ margin: 10, padding: 10, borderRadius: 8, borderWidth: 1 }}>
      <Image source={{ uri: course.image }} style={{ width: 100, height: 100 }} />
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{course.name}</Text>
      <Text>{course.description}</Text>
      <TouchableOpacity onPress={handleRateCourse} style={{ marginTop: 10, backgroundColor: 'lightblue', padding: 5, borderRadius: 5 }}>
        <Text>Rate this course</Text>
      </TouchableOpacity>
      <Text>Rating: {rating}</Text>
    </View>
  );
};

const CourseList = ({ courses, onRate }) => {
  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CourseItem course={item} onRate={onRate} />}
    />
  );
};

const App = () => {
  const [courses, setCourses] = useState(coursesData);

  const handleRateCourse = (courseId, newRating) => {
    // Limit rating to the range of 0 to 6
    if (newRating > 6) {
      newRating = 6;
    }
    // Update rating for the course in the state or send it to the backend
    const updatedCourses = courses.map((course) =>
      course.id === courseId ? { ...course, rating: newRating } : course
    );
    setCourses(updatedCourses);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CourseList courses={courses} onRate={handleRateCourse} />
    </View>
  );
};

export default App;
