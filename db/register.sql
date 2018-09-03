insert into users (name, username, email, password)
values(${name}, ${username}, ${email}, ${password})
returning id, name, username, email;