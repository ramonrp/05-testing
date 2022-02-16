import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('mapProjectFromApiToVm(proyect)', () => {
  it('should return an empty vm project if project is a falsy value', () => {
    const project = undefined;
    const projectAPI: apiModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    const actual = mapProjectFromApiToVm(project);
    expect(actual).toEqual(projectAPI);
  });
  it('should return an empty project vm if project is null', () => {
    const project = null;
    const projectAPI: apiModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    const actual = mapProjectFromApiToVm(project);
    expect(actual).toEqual(projectAPI);
  });
  it('should return a project in vm when a project project argument is a api project', () => {
    const employees: apiModel.EmployeeSummary[] = [
      { id: '1', isAssigned: false, employeeName: 'employee1' },
    ];
    const projectAPI: apiModel.Project = {
      id: '1',
      name: 'project1',
      externalId: '1',
      comments: 'test-project',
      isActive: false,
      employees,
    };
    const projectVM: viewModel.Project = {
      ...projectAPI,
      employees: [{ id: '1', isAssigned: false, employeeName: 'employee1' }],
    };

    const actual = mapProjectFromApiToVm(projectAPI);

    expect(actual).toEqual(projectVM);
  });
});
