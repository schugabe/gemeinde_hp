class PeopleController < ApplicationController
  before_action :set_team
  before_action :set_person, only: [:show, :edit, :update, :destroy, :sort]

  def index
    @people = @team.persons.all
  end

  def show
  end

  def new
    @person = @team.persons.build
  end

  def edit
  end

  def create
    @person = @team.persons.build(person_params)
    if @person.save
      redirect_to [@team,@person], notice: 'Person was successfully created.'
    else
      render action: 'new'
    end
  end

  def update
    if @person.update(person_params)
      redirect_to [@team,@person], notice: 'Person was successfully updated.'
    else
      render action: 'edit'
    end
  end

  def destroy
    @person.destroy
    redirect_to team_people_url(@team)
  end
  
  def sort
    @person.attributes = params[:thing]
    @person.save
    render nothing: true
  end
  

private
  def set_team
    @team = Team.find(params[:team_id])
  end
  
  def set_person
    @person = @team.persons.find(params[:id])
  end

  def person_params
    params.require(:person).permit(:name, :position, :about, :contact, :group_id, :avatar)
  end
end
