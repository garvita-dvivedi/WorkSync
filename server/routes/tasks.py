from flask import Blueprint, request, jsonify
from models.task import Task
from models import db
from utils.auth import token_required

task_bp = Blueprint('tasks', __name__)

@task_bp.route('/tasks', methods=['GET'])
@token_required
def get_tasks(user_id):
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': t.id, 'title': t.title, 'duration': t.duration, 'status': t.status} for t in tasks])

@task_bp.route('/tasks', methods=['POST'])
@token_required
def create_task(user_id):
    data = request.get_json()
    task = Task(user_id=user_id, title=data['title'], duration=data['duration'])
    db.session.add(task)
    db.session.commit()
    return jsonify({'message': 'Task created'})

@task_bp.route('/schedule', methods=['GET'])
@token_required
def schedule_tasks(user_id):
    tasks = Task.query.filter_by(user_id=user_id, status='pending').all()
    schedule = []
    start = datetime.datetime.now().replace(minute=0, second=0, microsecond=0)
    for task in tasks:
        end = start + datetime.timedelta(minutes=task.duration)
        schedule.append({ 'title': task.title, 'start': start.strftime('%H:%M'), 'end': end.strftime('%H:%M') })
        start = end
    return jsonify(schedule)
