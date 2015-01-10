class PeopleController < ApplicationController
  before_action :set_team
  before_action :set_person, only: [:show, :edit, :update, :destroy, :sort]
  add_breadcrumb "Teams", :teams_path
  authorize_actions_for Person, :actions => {sort: :update}
  
  def index
    add_breadcrumb @team.name, :team_people_path
    @people = @team.persons.rank(:row_order)
  end

  def show
    redirect_to @team
  end

  def new
    @person = @team.persons.build
    add_breadcrumb @team.name, :team_people_path
    add_breadcrumb "Neue Person"
  end

  def edit
    add_breadcrumb @team.name, :team_people_path
    add_breadcrumb "bearbeiten"
  end

  def create
    @person = @team.persons.build(person_params)
    if @person.save
      redirect_to [@team,@person], notice: t('actions.created')
    else
      render action: 'new'
    end
  end

  def update
    if @person.update(person_params)
      redirect_to [@team,@person], notice: t('actions.updated')
    else
      render action: 'edit'
    end
  end

  def destroy
    @person.destroy
    redirect_to team_people_path(@team)
  end
  
  def sort
    @person.row_order_position = sort_params[:row_order_position]
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
  
  def sort_params
    params.require(:sort_data).permit(:row_order_position)
  end
end
