# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :person do
    name "MyString"
    position "MyString"
    about "MyText"
    contact "MyText"
    group nil
  end
end
