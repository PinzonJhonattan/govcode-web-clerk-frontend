export enum ACTOR_ROLES_PERMISSIONS {
  ACTOR_ADMIN = 'actor_administrator',
  ACTOR_CITIZEN = 'actor_citizen',
  ACTOR_CLERK = 'actor_clerk',
}

export enum APP_ROLES_PERMISSIONS {
  // Módulo de Tareas
  APP_COMPLETE_TASKS = 'app_complete_tasks',
  APP_REASSIGN_TASKS = 'app_reassign_tasks',
  APP_VIEW_ALL_TASK = 'app_view_all_task',
  APP_VIEW_TASK_LOAD = 'app_view_task_load',
  APP_VIEW_TASKS = 'app_view_tasks',

  // Módulo de Usuarios Ciudadanos - Roles
  APP_CREATE_CITIZEN_ROLES = 'app_create_citizen_roles',
  APP_EDIT_CITIZEN_ROLES = 'app_edit_citizen_roles',
  APP_DELETE_CITIZEN_ROLES = 'app_delete_citizen_roles',
  APP_VIEW_CITIZEN_ROLES = 'app_view_citizen_roles',

  // Módulo de Usuarios Ciudadanos - Usuarios
  APP_CREATE_CITIZEN_USERS = 'app_create_citizen_users',
  APP_EDIT_CITIZEN_USERS = 'app_edit_citizen_users',
  APP_DELETE_CITIZEN_USERS = 'app_delete_citizen_users',
  APP_VIEW_CITIZEN_USERS = 'app_view_citizen_users',

  // Módulo de Usuarios Funcionarios - Roles
  APP_CREATE_CLERK_ROLES = 'app_create_clerk_roles',
  APP_EDIT_CLERK_ROLES = 'app_edit_clerk_roles',
  APP_DELETE_CLERK_ROLES = 'app_delete_clerk_roles',
  APP_VIEW_CLERK_ROLES = 'app_view_clerk_roles',

  // Módulo de Usuarios Funcionarios - Usuarios
  APP_CREATE_CLERK_USERS = 'app_create_clerk_users',
  APP_EDIT_CLERK_USERS = 'app_edit_clerk_users',
  APP_DELETE_CLERK_USERS = 'app_delete_clerk_users',
  APP_VIEW_CLERK_USERS = 'app_view_clerk_users',

  // Módulo de Grupos
  APP_CREATE_GROUPS = 'app_create_groups',
  APP_DELETE_GROUPS = 'app_delete_groups',
  APP_EDIT_GROUPS = 'app_edit_groups',
  APP_VIEW_GROUPS = 'app_view_groups',

  // Módulo de Listas
  APP_CREATE_LISTS = 'app_create_lists',
  APP_DELETE_LISTS = 'app_delete_lists',
  APP_EDIT_LISTS = 'app_edit_lists',
  APP_VIEW_LISTS = 'app_view_lists',

  // Módulo de Trámites
  APP_CREATE_PROCEDURES = 'app_create_procedures',
  APP_DELETE_PROCEDURES = 'app_delete_procedures',
  APP_EDIT_PROCEDURES = 'app_edit_procedures',
  APP_VIEW_PROCEDURES = 'app_view_procedures',

  // Módulo de Reportes
  APP_CREATE_REPORTS = 'app_create_reports',
  APP_DELETE_REPORTS = 'app_delete_reports',
  APP_EDIT_REPORTS = 'app_edit_reports',
  APP_VIEW_REPORTS = 'app_view_reports',

  // Módulo de Firmas
  APP_CREATE_SIGNATURES = 'app_create_signatures',
  APP_DELETE_SIGNATURES = 'app_delete_signatures',
  APP_EDIT_SIGNATURES = 'app_edit_signatures',
  APP_VIEW_SIGNATURES = 'app_view_signatures',
  APP_SIGN_DOCUMENT = 'app_sign_document',

  // Módulo de Plantillas
  APP_CREATE_TEMPLATES = 'app_create_templates',
  APP_DELETE_TEMPLATES = 'app_delete_templates',
  APP_EDIT_TEMPLATES = 'app_edit_templates',
  APP_VIEW_TEMPLATES = 'app_view_templates',
  APP_GENERATE_TEMPLATE = 'app_generate_template',

  // Módulo de Documentos
  APP_VIEW_HISTORY_DOCUMENTS = 'app_view_history_documents',
}
