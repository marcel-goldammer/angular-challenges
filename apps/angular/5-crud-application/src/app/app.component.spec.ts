import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { TodoService } from './data-access/todo.service';

const todoServiceMock: Partial<TodoService> = {
  getTodos: jest.fn(() =>
    of([
      { id: 1, title: 'Todo 1', completed: false, userId: 1 },
      { id: 2, title: 'Todo 2', completed: true, userId: 1 },
    ]),
  ),

  updateTodo: jest.fn((todo) => of({ ...todo, title: 'Updated Todo' })),

  deleteTodo: jest.fn(() => of(undefined)),
};

describe('AppComponent', () => {
  it('load all todos', async () => {
    const app = await render(AppComponent, {
      providers: [{ provide: TodoService, useValue: todoServiceMock }],
    });

    expect(todoServiceMock.getTodos).toHaveBeenCalled();
    expect(app.getByText('Todo 1')).toBeInTheDocument();
    expect(app.getByText('Todo 2')).toBeInTheDocument();
  });

  it('updates todo when "Update" button is clicked', async () => {
    const app = await render(AppComponent, {
      providers: [{ provide: TodoService, useValue: todoServiceMock }],
    });
    const updateButton = app.getAllByText('Update')[0];

    expect(app.getByText('Todo 1')).toBeInTheDocument();

    updateButton.click();
    app.fixture.detectChanges();

    expect(app.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(todoServiceMock.updateTodo).toHaveBeenCalled();
    expect(app.getByText('Updated Todo')).toBeInTheDocument();
  });

  it('deletes todo when "Delete" button is clicked', async () => {
    const app = await render(AppComponent, {
      providers: [{ provide: TodoService, useValue: todoServiceMock }],
    });
    const deleteButton = app.getAllByText('Delete')[0];

    expect(app.getByText('Todo 1')).toBeInTheDocument();

    deleteButton.click();
    app.fixture.detectChanges();

    expect(app.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(todoServiceMock.deleteTodo).toHaveBeenCalled();
  });
});
