# Troubleshooting

A type of question is explaining how you would debug or troubleshoot an existing issue. These questions should be approached in a structured manner, like anything else.

Let's walk through this problem with an example: You're working on the Google Chrome team, when you receive a bug report: Chrome crashes on launch. What would you do?

Reinstalling the browser might solve this user's problem, but it wouldn't help other users who might be experiencing the same issue.

Your goal is to **understand what's really happening, so that the developers can fix it**.

## Step 1: Understand the Scenario

The first thing you should do is ask questions to understand as much as possible about the situation and the problem at hand.

* How long has the user been experiencing this issue?
* Does the issue happen consistently, or how often does it happen? Exactly when does it happen?
* Where there any changes to the software? Like add-ons, etc.
* What version on the browser is it? What operating system?
* Is there an error report that is displayed?

## Step 2: Break Down the Problem

Now that you understand the details of the scenario, you want to break down the problem into testable units. In this case, you can imagine the flow of the situation as follows:

1. Go to the Windows Start menu
2. Click on Chrome icon
3. Browser instance start
4. Browser loads setting
5. Browser issues HTTP request for homepage
6. Browser gets HTTP response
7. Browser parses webpage
8. Browser displays content

At some point in this process, something fails and it causes the browser to crash. A strong tester would iterate through the elements of this scenario to diagnose the problem.

## Step 3: Create Specific, Manageable Tests

Each of the above components should have realistic instructions - things that you can ask the user to do, or things that you can do yourself (such as replicating steps on your own machine). In the real world, you will be dealing with customer, and you can't give them instructions that they can't or won't do.



