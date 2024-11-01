import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export const AppBreadcrumb = (props: {
  routes: { name: string; href: string; endpoint: boolean }[];
}) => {
  return (
    <Breadcrumb className="mx-2 mb-4">
      <BreadcrumbList>
        {props.routes
          .filter((r) => r.endpoint === false)
          .map((r, _i) => (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={r.href}>{r.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}

        {props.routes
          .filter((r) => r.endpoint === true)
          .map((r) => (
            <BreadcrumbItem>{r.name}</BreadcrumbItem>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
