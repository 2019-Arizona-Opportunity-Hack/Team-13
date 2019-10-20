# mbl-java-api

The purpose of this app is to allow translation speaking users to fill out a pdf form document that has questions in English. The app asks the questions in translation and puts the responses in the correct spot. Then the user may download the form to submit to the correct government entity.

existing entities:

- Question
- QuestionList
- Response
- Submission (this may be removed in the near future)
- User
- UsForm

### Question

Question Properties:

- Long id\*
- String questionText\*
  - the question to be answered
- String questionInfo
  - info to help the user answer the question correctly
- String xPlacement\*
  - number in pixels describing where to place the response on the x-axis
- String yPlacement\*
  - number in pixels describing where to place the response on the x-axis
- Long pageOnForm\*
  - number in describing which page of the form to place the response
  - start with 0
- String partOfForm\*
  - taken from the form to describe which part of the form the question is from
- String questionNumber\*
  - the number of the question
  - some forms start the counting over in each new part
- String questionNumberPart\*
  - identical to partOfForm
  - REDUNDANT
  - may be removed in the near future
- String special
  - any special instructions for this question
- String translationText\*
  - the translation translation of the questionText
- String questionType\*
  - describes the type of question
  - used to determine how the UI should handle the question
    - ex: text, radio, checkbox, etc
- String responseText
  - used to store the user response
  - may be removed in the near future
- String questionSequence\*
  - used to identify unique question
  - NOT updatable
  - unique
  - questionSequence = questionNumberPart + "-" + questionNumber;
- QuestionList questionList\*
  - this is used to put all the questions for a specific form into one list
  - this may be removed later to reduce redundancy because forms share many of the same questions
  - default is `1`
  - NOT updatable
  - NOT nullable
- String usFormNumber\*
  - this is used to attach the question to a specific form
  - NOT updatable

### QuestionList

QuestionList Properties:

- Long id \*
- String usFormNumber \*
  - the official form number given to the form
- UsForm usForm \*
  - mapped to UsForm domain
  - NOT nullable
- List question
  - mapped to Question domain

### Response

Response Properties:

- Long id \*
- User user \*
- String applicationIdentifier \*
  - used to attach each response to a user application/form
  - applicationIdentifier = userId + "-" + usFormNumber
- String questionSequence \*
  - used to attach each response to a question
  - questionSequence = usFormNumber + "-" + questionNumberPart + "-" + questionNumber
- String userFormQuestionResponse
  - used to attach each response to a user form question
  - user is only allowed one response per question
  - userFormQuestionResponse = userId + "-" + usFormNumber + "-" + questionNumberPart + "-" + questionNumber
- String translationText
  - the translation translation of the questionText
- Boolean confirmed
  - used to track if the response is accurate
- String usFormNumber
  - used to attach a response to the correct form
- String xPlacement\*
  - number in pixels describing where to place the response on the x-axis
- String yPlacement\*
  - number in pixels describing where to place the response on the x-axis
- Long pageOnForm\*
  - number in describing which page of the form to place the response
  - start with 0
- String responseText
  - user's response to the question

### User

User Properties:

- Long id \*
- String username \*
  - this is the user's email
  - valid email address
  - unique
- String password \*
  - encrypted using BCrypt
- String confirmPassword
  - NOT saved in db

### UsForm

UsForm Properties:

- Long id \*
- String formName \*
  - the name given to the form by the issuing entity
- String formNumber
  - the number given to the form by the issuing entity
  - unique
  - NOT updatable
- String formLocation
  - NOT used, may be removed in the near future
- String formDescription
  - description given to form by issuing entity
- QuestionList questionList\*
  - this is used to put all the questions for a specific form into one list
  - this may be removed later to reduce redundancy because forms share many of the same questions
  - default is `1`
  - NOT updatable
  - NOT nullable

\* denotes required
