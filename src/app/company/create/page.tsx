import Header from '@/components/shared/Header';
import React from 'react';
import CreateCompanyForm from '@/app/company/create/CreateCompanyForm/CreateCompanyForm';

function Page() {
  return (
    <div>
      <Header />
      <CreateCompanyForm className={'mt-[2rem]'} />
    </div>
  );
}

export default Page;
