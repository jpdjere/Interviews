SELECT country, AVG(imdb_score) AS score, count(title) from films JOIN reviews ON films.id=reviews.film_id 
GROUP BY country 
HAVING count(title) > 3
ORDER BY score DESC

https://www.hackerrank.com/challenges/the-report/problem
SELECT IF(Grade >= 8, Name, NULL), Grade, Marks FROM Students JOIN Grades ON Students.Marks BETWEEN Grades.Min_Mark AND Grades.Max_Mark
ORDER BY Grade DESC, Name, Marks ASC


/*
Este esta mal. Terminarlo.
https://www.hackerrank.com/challenges/full-score/problem
*/

SELECT Hackers.hacker_id, Hackers.name FROM Hackers
INNER JOIN Challenges ON Hackers.hacker_id=Challenges.hacker_id
INNER JOIN Difficulty ON Challenges.difficulty_level=Difficulty.difficulty_level
INNER JOIN Submissions ON Hackers.hacker_id=Submissions.hacker_id
WHERE Difficulty.score < Submissions.score
GROUP BY Hackers.hacker_id, Hackers.name
ORDER BY (
    SELECT count(*) FROM Submissions
    INNER JOIN Challenges ON Challenges.challenge_id=Submissions.challenge_id
    INNER JOIN Difficulty ON Difficulty.difficulty_level=Challenges.difficulty_level
    WHERE Submissions.score=Difficulty.score
)