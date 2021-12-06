export interface IModuleBlueprint {
  module: string;
  methods: Record<string, IMethodSpec>;
}

export interface IMethodSpec {
  endpoint: string;
  description?: string;
  payload?: Record<string, IModelSpec>;
  response?: Record<string, IModelSpec>;
}

export interface IModelSpec {
  type: string;
  description?: string;
  isOptional?: boolean;
  isArray?: boolean;
}