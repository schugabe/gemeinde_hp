# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :event do
    title "MyString"
    description "MyText"
    starts_at "2014-01-22 17:50:16"
    ends_at "2014-01-22 17:50:16"
    all_day false
  end
end
