# language:ja
前提 /^リクエストヘッダの"(.*?)"に"(.*?)"がある$/ do |header_name, request_str|
  request.headers["#{header_name}"] = "#{request_str}"
end

もし /^"(.*?)"IDに"(.*?)"と入力する$/ do |table, id|
  
end

もし /^"(.*?)"が"(.*?)"である$/ do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end

ならば /^最初の"(.*?)"を表示する$/ do |arg1|
  pending # express the regexp above with the code you wish you had
end