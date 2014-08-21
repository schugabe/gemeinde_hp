# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :magazine do
    issue 1
    year 1
    title "MyString"
  end
end
